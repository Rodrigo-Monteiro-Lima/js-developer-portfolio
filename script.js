const btns = document.querySelectorAll('.dropdown-button');
btns.forEach((btn) => {
  btn.addEventListener('click', ({target}) => {
    target.parentNode.classList.toggle('open')
  })
})

const fetchData = async () => {
  const endpoit = 'https://raw.githubusercontent.com/Rodrigo-Monteiro-Lima/js-developer-portfolio/main/data/profile.json';
  const response = await fetch(endpoit);
  const data = await response.json();
  return data
}

const resolveData = (data) => {
  const pic = document.querySelector('.image');
  const mail = document.querySelector('#mail');
  const name = document.querySelector('#name');
  const job = document.querySelector('.job');
  const location = document.querySelector('.location');
  const cel = document.querySelector('#cel');
  pic.src = data.photo;
  pic.alt = data.name;
  name.innerText = data.name;
  job.innerHTML = data.job;
  location.innerHTML = data.location;
  cel.innerHTML = data.phone;
  cel.href = `tel:${data.phone}`
  mail.innerHTML = data.email;
  mail.href = data.email;
}

const resolveSkills = (data) => {
  const hSkills = document.querySelector('.hard-skills');
  const sSkills = document.querySelector('.soft-skills');
  hSkills.innerHTML = data.skills.hardSkills.map((skill) => `<li><img src="${skill.logo}" alt="${skill.nam} title="${skill.name}" /></li>`).join('');
  sSkills.innerHTML = data.skills.softSkills.map(skill => `<li>${skill}</li>`).join('');
}

const resolveLanguage = (data) => {
  const languages = document.querySelector('.languages');
  languages.innerHTML = data.languages.map((language) => `<li>${language}</li>`).join('');
}

const resolvePorfolio = (data) => {
  const portfolio = document.querySelector('.portfolio');
  portfolio.innerHTML = data.portfolio.map(project => {
      return `
          <li>
              <h3 ${project.github ? 'class="github"' : ''}>${project.name}</h3>
              <a href="${project.url}" target="_blank">${project.url}</a>
          </li>
      `
  }).join('')
}

const resolveJobExperience = (data) => {
  const JobExperience = document.querySelector('.experience');
  (data.professionalExperience.length !== 0 ? JobExperience.innerHTML = data.professionalExperience.map(experience => {
    return `
        <li>
            <h3 class="title">${experience.name}</h3>
            <p class="period">${experience.period}</p>
            <p class="description">${experience.description}</p>
        </li>
    `
}).join('') : JobExperience.innerHTML = "")
}

window.onload = async () => {
  const data = await fetchData();
  resolveData(data);
  resolveSkills(data);
  resolveLanguage(data);
  resolvePorfolio(data);
  resolveJobExperience(data);
}