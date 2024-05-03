import CardTopics from '../molecules/CardTopics';
import { useEffect, useState } from 'react';
import { getStoryById } from '../../services/connections';
import Loading from '../atoms/Loading';
export default function Topics() {
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPricipals() {
      try {
        const photos = [
          'https://images.pexels.com/photos/3207694/pexels-photo-3207694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1844547/pexels-photo-1844547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/2787341/pexels-photo-2787341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/2224736/pexels-photo-2224736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ];

        const ids = [
          '40231790',
          '40224213',
          '40213562',
          '40222051',
          '40211994',
          '40224210',
        ];

        let tempDatas = [];

        for (let i = 0; i < ids.length; i++) {
          const comment = await getStoryById(ids[i]);
          comment.photo = photos[i];
          tempDatas.push(comment);
          if (tempDatas.length === 6) {
            setIsLoading(false);
            break;
          }
        }
        setDatas(tempDatas);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    loadPricipals();
  }, []);
  return (
    <section className="w-screen h-full bg-slate-100 py-16 px-4 flex flex-col justify-center items-center">
      <h2 className="letter-theme text-3xl shadow-yellow">
        Principais Tópicos
      </h2>
      {isLoading ? (
        <Loading colorLoad="border-zinc-800" />
      ) : (
        <div className="grid grid-cols-1 items-center justify-items-center mt-10 flex-col gap-4 md:grid-cols-2 xl:grid-cols-3 max-w-[1300px]">
          {datas.slice(0, 6).map((item) => (
            <CardTopics story={item} key={item.id} />
          ))}
        </div>
      )}
    </section>
  );
}
