import { useState } from "react";
import { isValid } from "../util/move.util";
import ScrambleImagesTable from "./ScrambleImagesTable";

const ScrambleImage = () => {
  const [content, setContent] = useState("");
  const [validScrambles, setValidScrambles] = useState<string[]>([]);

  const handleClick = () => {
    setValidScrambles(content.split("\n").filter(isValid));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className="p-2">Generate Scramble Images</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Place scrambles 1 each line"
            required
            rows={8}
          />
        </div>
      </div>

      <button type="button" className="btn btn-primary m-2" onClick={handleClick}>
        Generate Images
      </button>
      <ScrambleImagesTable scrambles={validScrambles} />
    </div>
  );
};

export default ScrambleImage;
