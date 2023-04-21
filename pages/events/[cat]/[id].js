import SingleEvent from '@/components/events/single-event';
import Image from 'next/image'


const DynamicPages = ({data}) => {
  // console.log(data);
  return (
    // <div>
    //     <Image alt={data.title} src={data.image} width={250} height={200} />
    //   <h1>{data.title}</h1>
    //   <p>{data.description}</p>
    // </div>
    <SingleEvent data={data} />
  )
}
export default DynamicPages;

export async function getStaticPaths() {
  const data = await import('/data/data.json');
  const allEvents = data.allEvents;

  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      }
    }
  });

  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  // console.log(context)

  const {allEvents} = await import('/data/data.json');
  const id = context.params.id;
  // console.log(id)
  
  const eventData = allEvents.find((event) => 
    id === event.id
  );

  return {
    props: {
      data: eventData,
    },
  }
}
