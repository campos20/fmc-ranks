import { useState, type FormEvent } from "react";
import { getFmcScrambles } from "../api/scramble.web.api";
import Loading from "./Loading";
import ScrambleImagesTable from "./ScrambleImagesTable";

const GenerateScrambles = () => {
  const [scrambles, setScrambles] = useState<string[]>([]);
  const [numberOfScrambles, setNumberOfScrambles] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getFmcScrambles(numberOfScrambles);
      const data: { scrambles: string[] } = await response.json();
      setScrambles(data.scrambles);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error while generating scrambles.");
    } finally {
      setLoading(false);
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
            />
          </div>
          <button type="submit" className="btn btn-primary m-2">
            Generate Scrambles
          </button>
        </div>
      </form>
      {loading && <Loading />}
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
