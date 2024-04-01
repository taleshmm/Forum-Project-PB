import CardTopics from '../molecules/CardTopics';
import { useEffect, useState } from 'react';
export default function Topics() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    async function loadJson() {
      try {
        const response = await fetch('src/assets/datas-main-topics.json');
        const data = await response.json();
        setDatas(data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    }
    loadJson();
  }, []);
  return (
    <section className="w-screen h-full bg-slate-100 py-16 px-4 flex flex-col justify-center items-center">
      <h2 className="letter-theme text-3xl shadow-yellow">
        Principais Tópicos
      </h2>
      <div className="grid grid-cols-1 items-center justify-items-center mt-10 flex-col gap-4 md:grid-cols-2 xl:grid-cols-3 max-w-[1300px]">
        {datas.slice(0, 6).map((item) => (
          <CardTopics data={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
