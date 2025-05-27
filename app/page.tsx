import Button from "@/components/global/Button";

export default function Home() {
  return (
    <section className="h-screen w-full bg-black/50 flex items-center justify-center bg-blur-lg">
      <div className="w-full max-w-[400px] text-black bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-3xl font-semibold text-blue-500 mb-6">
          Welcome to Dashboard Analytics
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Get insights and track your progress in the dashboard.
        </p>
        <Button label="Go to Login" link="/login" />
      </div>
    </section>
  );
}
