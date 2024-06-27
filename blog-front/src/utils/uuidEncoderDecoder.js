//un chiffrement de César simple pour encoder et décoder les UUID
const encodeUUID = (uuid) => {
  return btoa(uuid);
};

const decodeUUID = (encodedUUID) => {
  return atob(encodedUUID);
};

export { encodeUUID, decodeUUID };
