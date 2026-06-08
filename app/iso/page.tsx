import List from "@/app/iso/components/List";

export default function Elemente() {
  return (
    <div
      className="container mx-auto px-4 pb-12"
      style={{ paddingTop: "60px" }}
    >
      <h2 className="text-center !text-[24px] mb-6 tracking-wide !whitespace-normal">
        Festgelegte Techniken
      </h2>
      <List />
    </div>
  );
}
