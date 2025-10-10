import { useErrorBoundary } from "react-error-boundary";

export default function ErrorMessage() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="text-2x-large md:text-4x-large flex flex-col rounded-sm items-center justify-center w-3/4 h-3/4 md:w-1/2 md:h-1/2 p-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-white bg-orange-darker/60">
      <p className="text-center">Ups... Coś poszło nie tak!</p>
      <p className="text-center text-extra-large">
        Jeśli problem występuje nadal, skontaktuj się z administratorem.{" "}
        <a href="mailto:sklepsznyc@gmail.com">sklepsznyc@gmail.com</a>
      </p>
      <button
        className="p-12 md:p-4 md:px-10  rounded-sm hover:cursor-pointer bg-orange-darker hover:bg-orange-darker/80 ease-in-out duration-500 text-extra-large md:text-2x-large mt-8"
        onClick={resetBoundary}>
        Spróbuj ponownie
      </button>
    </div>
  );
}
