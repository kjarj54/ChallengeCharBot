import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sentence = searchParams.get('sentence');

  if (!sentence) {
    return NextResponse.json({ error: 'No sentence provided' }, { status: 400 });
  }

  // Función para tokenizar la oración
  function tokenize(sentence: string): string[] {
    return sentence.toLowerCase().replace(/[.,!?]/g, '').split(' ');
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
}


