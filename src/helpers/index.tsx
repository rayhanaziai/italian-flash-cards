export const autoFocusInput = (
    inputRef: React.RefObject<
      HTMLInputElement | HTMLDivElement | HTMLTextAreaElement
    >,
    questionNum: number
  ): void => {
    if (inputRef && inputRef.current && questionNum === 1) {
      inputRef.current.focus();
    }
  };
  