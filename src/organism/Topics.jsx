import React from 'react';
import CardTopics from '../molecules/CardTopics';
import { useEffect, useState } from 'react';
import { getStoryById } from '../../services/connections';
import Loading from '../atoms/Loading';
import '../organism/styles/Topics.css';

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
    <section className="section-container">
      <h2 className="section-title">Principais Tópicos</h2>
      {isLoading ? (
        <Loading className="loading" />
      ) : (
        <div className="card-container">
          {datas.slice(0, 6).map((item) => (
            <CardTopics story={item} key={item.id} className="card" />
          ))}
        </div>
      )}
    </section>
  );
}
