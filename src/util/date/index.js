import moment from "moment";

export const formatToPTBR = date => {
  return moment(date).format("dd/MM/YYYY HH:mm");
};
