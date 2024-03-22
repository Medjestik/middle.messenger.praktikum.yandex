interface IChatForm {
  attr?: { [key: string]: string },
  onSubmit?: (formData: Record<string, unknown>) => void,
  events?: {
    submit: (event: Event) => void;
  };
}

export default IChatForm;
