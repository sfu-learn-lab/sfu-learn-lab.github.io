fetch('/data/publications.json')
  .then(res => res.json())
  .then(publications => {
    const container = document.querySelector('#recent-publications .pub-list');

    publications.slice(0, 10).forEach(pub => {
      const card = document.createElement('publication-card');
      if (pub.type) card.setAttribute('type', pub.type);
      if (pub.title) card.setAttribute('title', pub.title);
      if (pub.authors) card.setAttribute('authors', pub.authors);
      if (pub.venue) card.setAttribute('venue', pub.venue);
      if (pub.url) card.setAttribute('url', pub.url);
      if (pub.thumbnail) card.setAttribute('thumbnail', pub.thumbnail);
      if (pub.notes) card.setAttribute('notes', pub.notes);
      if (pub.year) card.setAttribute('year', pub.year);
      container.appendChild(card);
    });
  });

fetch('/data/people.json')
  .then(res => res.json())
  .then(people => {
    const featured = document.querySelector('#our-team .team-featured');
    const grid = document.querySelector('#our-team .team-grid');

    const active = people.filter(p => p.role.toLowerCase().includes('alum') === false);
    const prof = active.find(p => p.name === 'Parmit Chilana');
    const rest = active.filter(p => p.name !== 'Parmit Chilana');

    const makeCard = (person) => {
      const card = document.createElement('profile-card');
      card.setAttribute('name', person.name);
      card.setAttribute('role', person.role);
      if (person.photo) card.setAttribute('photo', person.photo);
      if (person.website) card.setAttribute('website', person.website);
      return card;
    };

    if (prof) featured.appendChild(makeCard(prof));

    rest.forEach(person => {
      const col = document.createElement('div');
      col.className = 'col';
      col.appendChild(makeCard(person));
      grid.appendChild(col);
    });
  });