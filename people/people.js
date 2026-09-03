const SECTIONS = [
  { id: 'faculty', roles: ['associate professor'], component: 'profile-bio' },
  { id: 'postdoc', roles: ['postdoc researcher'], component: 'profile-bio' },
  { id: 'graduate', roles: ['msc student', 'phd student'], component: 'profile-bio' },
  { id: 'undergrad', roles: ['usra student'], component: 'profile-bio' },
  { id: 'phd-alumni', roles: ['phd alum'], component: 'profile-bio' },
  { id: 'msc-alumni', roles: ['msc alum'], component: 'profile-card' },
  { id: 'other', roles: [null], component: 'profile-card' },
];

const makeProfileBio = (person) => {
  const card = document.createElement('profile-bio');
  card.setAttribute('name', person.name);
  card.setAttribute('role', person.role || '');
  if (person.photo) card.setAttribute('photo', person.photo);
  if (person.website) card.setAttribute('website', person.website);
  if (person.bio) card.setAttribute('bio', person.bio);
  return card;
};

const makeProfileCard = (person) => {
  const col = document.createElement('div');
  col.className = 'col';
  const card = document.createElement('profile-card');
  card.setAttribute('name', person.name);
  card.setAttribute('role', person.bio || '');
  if (person.photo) card.setAttribute('photo', person.photo);
  // if (person.website) card.setAttribute('website', person.website);
  col.appendChild(card);
  return col;
};

fetch('/data/people.json')
  .then(res => res.json())
  .then(people => {
    SECTIONS.forEach(({ id, roles, component }) => {
      const members = people.filter(p =>
        roles.some(r => r === null ? p.role == null : p.role?.toLowerCase().includes(r))
      );
      if (!members.length) {
        document.querySelector(`#${id}`)?.classList.add('d-none');
        return;
      }

      const container = document.querySelector(`#${id} .members-list`);
      if (!container) return;

      members.forEach(person => {
        const el = component === 'profile-bio'
          ? makeProfileBio(person)
          : makeProfileCard(person);
        container.appendChild(el);
      });
    });
  });