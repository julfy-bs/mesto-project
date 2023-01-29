import { LOADER, PROFILE } from './enum.js';

const loader = document.querySelector(LOADER.SELECTOR);
const profileName = document.querySelector(PROFILE.CONTENT_NAME);
const profileAvatar = document.querySelector(PROFILE.AVATAR);
const profileOccupation = document.querySelector(PROFILE.CONTENT_OCCUPATION);

const startLoader = () => {
  loader.classList.add(LOADER.ACTIVE_CLASS);
  profileName.classList.add(LOADER.SKELETON);
  profileName.classList.add(LOADER.SKELETON_TEXT);
  profileAvatar.classList.add(LOADER.SKELETON);
  profileOccupation.classList.add(LOADER.SKELETON);
  profileOccupation.classList.add(LOADER.SKELETON_TEXT);
};

const endLoader = () => {
  loader.classList.remove(LOADER.ACTIVE_CLASS);
  profileName.classList.remove(LOADER.SKELETON);
  profileName.classList.remove(LOADER.SKELETON_TEXT);
  profileAvatar.classList.remove(LOADER.SKELETON);
  profileOccupation.classList.remove(LOADER.SKELETON);
  profileOccupation.classList.remove(LOADER.SKELETON_TEXT);
};


export {
  startLoader,
  endLoader
};
