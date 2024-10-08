import { Project } from '@core/db/schema';

// Re-usable functions should be placed in here
export function formatDate(dateStr: string, numericDate: boolean | undefined = true) {
  let formattedStr;
  const dateObj = new Date(dateStr);
  if (numericDate) {
    formattedStr = dateObj.toLocaleDateString();
  } else {
    formattedStr = dateObj.toLocaleDateString(undefined, {
      // undefined means the localisation will be dependent on user location
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return formattedStr;
}

export function toCamelCase(input: string) {
  const words = input.toLowerCase().split('_');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(' ');
}

export function trimTextToLength(text: string, length: number) {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

export function sortHighlightedProjects(projects: Project[]) {
  const highlightedProjects = projects.filter((project) => project.highlighted);
  const nonHighlightedProjects = projects.filter((project) => !project.highlighted);
  return [...highlightedProjects, ...nonHighlightedProjects];
}
