import CommonLayout from "@/layouts/commonLayout";

export default async function Home() {
  return (
    <CommonLayout>
      <div className="w-full">
        <h1 className="text-2xl font-bold">Hello World</h1>
      </div>
    </CommonLayout>
  );
}
