import List from "@/app/musik/components/List";
import musikData from "@/public/data/musik.json";

export default function Elemente() {
  return (
    <div
      className="container mx-auto px-4 pb-12"
      style={{ paddingTop: "60px" }}
    >
      <h2 className="text-center !text-[24px] mb-6 tracking-wide !whitespace-normal">
        Musik
      </h2>
      <List initialElements={musikData} />
    </div>
  );
}
