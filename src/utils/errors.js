export const errors = (task) => {
  let error = {};
  const regexTitle = /^(?!\s)(?=.*\S).{4,60}$/;

  if (!regexTitle.test(task.title)) {
    error.title = "El titulo debe tener de 4 a 60 caracteres";
  }

  return error;
};
