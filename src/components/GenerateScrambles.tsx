import { useEffect, useRef, useState, type FormEvent } from "react";
import { generateFmcScramble } from "../scramble/fmc.scramble";
import Loading from "./Loading";
import ScrambleImagesTable from "./ScrambleImagesTable";

const MAX_SCRAMBLES = 20;

const GenerateScrambles = () => {
  const [scrambles, setScrambles] = useState<string[]>([]);
  const [numberOfScrambles, setNumberOfScrambles] = useState(3);
  const [pending, setPending] = useState(0);
  const [error, setError] = useState("");

  // Identifies the current generation, so results of an older run
  // (or arriving after unmount) are discarded.
  const generationRef = useRef(0);
  useEffect(() => () => void generationRef.current++, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const generation = ++generationRef.current;
    const total = Math.min(Math.max(numberOfScrambles, 1), MAX_SCRAMBLES);

    setScrambles([]);
    setError("");
    setPending(total);
    try {
      for (let i = 0; i < total; i++) {
        const scramble = await generateFmcScramble();
        if (generation !== generationRef.current) return;
        setScrambles((previous) => [...previous, scramble]);
        setPending(total - i - 1);
      }
    } catch (err) {
      console.error(err);
      if (generation === generationRef.current) {
        setError("Error while generating scrambles.");
        setPending(0);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Generate new Scrambles</h3>
        </div>
      </div>
      <form className="row justify-content-center" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text">Number of Scrambles</span>
            <input
              type="number"
              className="form-control"
              required
              value={numberOfScrambles}
              onChange={(e) => setNumberOfScrambles(Number(e.target.value))}
              min={1}
              max={MAX_SCRAMBLES}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary m-2"
            disabled={pending > 0}
          >
            Generate Scrambles
          </button>
        </div>
      </form>
      {pending > 0 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <Loading />
          <span className="text-muted">
            Generating {scrambles.length + 1} of {scrambles.length + pending}…
          </span>
        </div>
      )}
      {!!error && (
        <div className="row m-3">
          <div className="col-12">
            <div className="alert alert-danger">{error}</div>
          </div>
        </div>
      )}
      <ScrambleImagesTable scrambles={scrambles} />
    </div>
  );
};

export default GenerateScrambles;
