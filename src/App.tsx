import { useState } from "react";

export default function App() {
  const [choices, setChoices] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [randomChoice, setRandomChoice] = useState("");

  const addChoice = () => {
    if (inputText && choices.length < 5 && !choices.includes(inputText)) {
      setChoices((choices) => [inputText, ...choices]);
      setInputText("");
      setRandomChoice("");
    }
  };

  const deleteChoice = (text: string) => {
    setChoices((choices) => choices.filter((c) => c !== text));
    setRandomChoice("");
  };

  const select = (timeout: number) => {
    if (timeout >= 250) {
      setIsSelecting(false);
      return;
    }

    setIsSelecting(true);
    const randomIndex = Math.floor(choices.length * Math.random());
    setRandomChoice(choices[randomIndex]);
    setTimeout(() => {
      select(timeout + 10);
    }, timeout);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex" }}
      className="has-background-light"
    >
      <div
        style={{
          margin: "auto",
          padding: "2rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          className="is-size-5 has-text-centered block"
          style={{ maxWidth: "20rem" }}
        >
          Add up to 5 choices and click the select button to choose randomly
        </p>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            addChoice();
          }}
        >
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                value={inputText}
                onChange={(ev) => setInputText(ev.target.value)}
              />
            </div>
            <div className="control">
              <button
                type="submit"
                className="button is-primary"
                disabled={choices.length >= 5 || isSelecting}
              >
                +
              </button>
            </div>
          </div>

          {choices.map((choice) => (
            <div className="field has-addons" key={choice}>
              <div className="control">
                <input
                  className={
                    "input" +
                    (randomChoice === choice
                      ? " has-background-info has-text-white"
                      : "")
                  }
                  readOnly
                  value={choice}
                />
              </div>
              <div className="control">
                <button
                  className="button is-danger"
                  onClick={() => deleteChoice(choice)}
                  disabled={isSelecting}
                >
                  -
                </button>
              </div>
            </div>
          ))}
          <div className="field">
            <div className="control">
              <button
                className="button is-primary is-fullwidth"
                onClick={() => {
                  if (choices.length > 1) select(0);
                }}
                disabled={isSelecting || choices.length < 2}
              >
                Select
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
