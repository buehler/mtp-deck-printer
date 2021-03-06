import * as React from 'react';
import { useParams } from 'react-router-dom';
import { DeckStats } from '../components/deck-view/deckstats';
import { TappedOut } from '../components/deck-view/tappedout';

export const DeckOverview = () => {
  const { url: encodedUrl } = useParams() as { url: string };
  const url = decodeURIComponent(encodedUrl.replace('~', '.'));

  switch (true) {
    case url.includes('tappedout'):
      return <TappedOut url={url} />;
    case url.includes('deckstats'):
      return <DeckStats url={url} />;
    default:
      return <div>This card database is not yes supported</div>;
  }
};
