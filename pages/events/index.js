import Image from "next/image";
import Link from "next/link";

const Events = ({ data }) => {
  return (
    <div>
      <h1>Events Page</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.id}`}>
            <h2>{ev.title}</h2>
            <div style={{ width: "200px", height: "200px", position: "relative" }}>
              <Image alt={ev.title} src={ev.image} layout="fill" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;

export async function getStaticProps() {
  const { events_categories } = await import("/data/data.json");

  return {
    props: {
      data: events_categories,
    },
  };
}
