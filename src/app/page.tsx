import Dashboard from "@/components/dashboard";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg animate-pulse">
          <h1 className="text-4xl font-bold">Bienvenido</h1>
        </div>
      </div>
      <Dashboard />
    </>
  );
}
