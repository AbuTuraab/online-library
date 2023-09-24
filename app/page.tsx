import { getXataClient } from "@/utils/xata";
import Link from "next/link";


const xata = getXataClient();

export default async function Home() {
  const library = await xata.db.library.getMany();
  const serializedLibraryData = JSON.stringify(library);
  const DeserializedLibraryData = JSON.parse(serializedLibraryData);

  const books:Record<string, any> [] = DeserializedLibraryData 
  
  return (
    <main className="sm:flex grid  items-center justify-between p-5">
      {books &&
        books.length > 0 &&
        books.map((books) => (
          <div className="mx-5 my-10 " key={books.id}>
            <div className="h-[350px] w-[300px] bg-blue-300">
              <div className="">
                <div className=" my-5 mr-5">Book:{books["book-name"]}</div>
              </div>
              <div>
                <div className="my-5 mr-5"> Author: {books.author}</div>
              </div>
              <div>
                <div className="my-5 mr-5">Size: {books.size}</div>
              </div>

              <div>
                <div className="my-5 mr-5">
                  Image:
                  {books.image && (
                    <img
                      src={books.image[0].url}
                      className="h-[120px] w-[120px]"
                      alt={`Image for ${books["book-name"]}`}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="my-5 mr-5">
                  <button className="bg-red-300 p-1">
                    <Link
                      href={books.bookfile[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      download
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </main>
  );
}
