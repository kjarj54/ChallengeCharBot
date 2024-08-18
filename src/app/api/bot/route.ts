import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sentence = searchParams.get('sentence');

  // Función para tokenizar la oración
  function tokenize(sentence: string): string[] {
    return sentence.toLowerCase().replace(/[.,!?]/g, '').split(' ');
  }

  try {
    if (!sentence) {
      return NextResponse.json({ error: 'No sentence provided' }, { status: 400 });
    }

    // Leer y parsear el archivo db.json
    const dbPath = path.join(process.cwd(), 'src', 'app', 'api', 'db', 'db.json');
    const dbContent = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(dbContent);

    const tokens = tokenize(sentence);

    // Buscar las respuestas en el JSON
    let responseMessages: string[] = [];
    for (const entry of db.responses) {
      if (tokens.includes(entry.token)) {
        responseMessages.push(entry.response);
      }
    }

    if (responseMessages.length === 0) {
      responseMessages.push('No matching response found');
    }

    return NextResponse.json({ messages: responseMessages });
  } catch (error) {

    return NextResponse.json(
      { error: error },
      { status: 500 },
    );
  }
}


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sentence = body.sentence;
    const token = body.token;

    if (!sentence || !token) {
      return NextResponse.json({ error: 'Sentence and token are required' }, { status: 400 });
    }

    const dbPath = path.join(process.cwd(), 'src', 'app', 'api', 'db', 'db.json');
    const dbContent = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(dbContent);

    const existingEntryIndex = db.responses.findIndex((entry: { token: string }) => entry.token === token);

    if (existingEntryIndex !== -1) {
      // Actualizar la entrada existente
      db.responses[existingEntryIndex].sentence = sentence;
    } else {
      // Agregar una nueva entrada
      db.responses.push({ token, sentence });
    }

    // Guardar el archivo db.json actualizado
    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    
    return NextResponse.json({ message: 'Data saved successfully' }, {status: 200});
  } catch (error) {

    return NextResponse.json(
      { error: error },
      { status: 500 },
    );
  }
}