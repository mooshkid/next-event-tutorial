import Image from "next/image";
import Link from "next/link";


function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const CategoryPage = ({ data, pageName }) => {
  return (
    <div>
      <p>this is an event category page</p>
      <h1>Events in {capitalizeFirstLetter(pageName)}</h1>
      <div>
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
              <h2>{ev.title}</h2>
              <div style={{ width: "200px", height: "200px", position: "relative" }}>
                <Image alt={ev.title} src={ev.image} layout="fill" />
              </div>
              <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default CategoryPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });
  // console.log(allPaths);

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // console.log(context);

  const id = context?.params.cat;
  // console.log(id)

  const { allEvents } = await import("/data/data.json");

  const data = allEvents.filter((ev) => ev.city.toLowerCase() === id);
  // console.log(data);

  return {
    props: {
      data: data,
      pageName: id,
    },
  };
}
