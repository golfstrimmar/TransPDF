import List from "@/app/elemente/components/List";

export default function Elemente() {
  return (
    <div className="container mx-auto px-4 pb-12" style={{ paddingTop: "100px" }}>
      <h2 className="text-center text-2xl md:text-3xl mb-6 tracking-wide !whitespace-normal">
        Elemente
      </h2>
      <List />
    </div>
  );
}
