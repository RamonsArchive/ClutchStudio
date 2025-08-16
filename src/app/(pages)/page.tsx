import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-center w-full h-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Hello World</h1>
        <p className="text-lg">This is a test</p>
      </div>
    </div>
  );
}
