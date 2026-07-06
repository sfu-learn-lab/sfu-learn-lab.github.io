const SECTIONS = [
  'journal',
  'conference',
  'juried',
  'workshop_peer_reviewed',
  'poster',
  'workshop_non_archived',
];

const makeCard = (pub) => {
  const card = document.createElement('publication-card');
  card.setAttribute('title', pub.title);
  card.setAttribute('authors', pub.authors);
  card.setAttribute('venue', pub.venue);
  if (pub.type) card.setAttribute('type', pub.type);
  if (pub.year) card.setAttribute('year', pub.year);
  if (pub.url) card.setAttribute('url', pub.url);
  if (pub.image) card.setAttribute('image', pub.image);
  if (pub.notes) card.setAttribute('notes', pub.notes);
  return card;
};

fetch('/data/publications.json')
  .then(res => res.json())
  .then(publications => {
    SECTIONS.forEach(type => {
      const entries = publications.filter(p => p.type === type);
      if (!entries.length) {
        document.querySelector(`#${type}`)?.classList.add('d-none');
        return;
      }
      const container = document.querySelector(`#${type} .pub-list`);
      if (!container) return;
      entries.forEach(pub => container.appendChild(makeCard(pub)));
    });
  });