import * as React from 'react';
import { useState, useEffect } from 'react';
import { Cards } from '../cards';

const Loader = () => (
  <>
    <div className="mb-8">Loading</div>
    <div className="inline-block animate-spin">
      <svg viewBox="0 0 20 20" fill="currentColor" className="cog w-6 h-6">
        <path
          fillRule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </>
);

interface Data {
  title: string;
  cards: { title: string; count: number }[];
}

export const TappedOut = ({ url }: { url: string }) => {
  const [data, setData] = useState(null as Data | null);

  useEffect(() => {
    const regex = url.match(/mtg-decks[/](.*)/);
    if (!regex) {
      return;
    }
    const deck = regex[1].replace('/', '');

    async function load() {
      if (data) {
        return;
      }

      const result = await fetch(`https://tappedout.net/api/deck/widget/?deck=${deck}`, {
        method: 'GET',
      });

      const content = await result.json();
      setData({
        title: content.title,
        cards: (content.cards as string).split('||').map(card => {
          const [_, count, title] = card.match(/(\d*)\s(.*)/)!;
          return {
            title,
            count: parseInt(count, 10),
          };
        }),
      });
    }

    load();
  });

  return !data ? (
    <Loader />
  ) : (
    <>
      <div className="mb-8 print-hidden">{data.title}</div>
      <Cards cards={data.cards} />
    </>
  );
};
