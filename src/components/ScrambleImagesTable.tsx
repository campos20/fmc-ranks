import { useState } from "react";
import "scramble-display";

interface Props {
  scrambles: string[];
}

const ScrambleImagesTable = ({ scrambles }: Props) => {
  const [copiedScramble, setCopiedScramble] = useState<string | null>(null);
  const [image3d, setImage3d] = useState(false);

  const copyToClipboard = async (i: number) => {
    const text = `${i + 1}. ${scrambles[i]}`;
    await navigator.clipboard.writeText(text);
    setCopiedScramble(text);
  };

  if (scrambles.length === 0) {
    return null;
  }

  return (
    <>
      <div className="row">
        <div className="col-6 text-start text-muted">You can click to copy</div>
        <div className="col-6 d-flex justify-content-end">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={image3d}
              onChange={() => setImage3d(!image3d)}
              id="image3dcheck"
            />
            <label className="form-check-label" htmlFor="image3dcheck">
              3D image
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table">
            <tbody>
              {scrambles.map((scramble, i) => {
                const text = `${i + 1}. ${scramble}`;
                return (
                  <tr key={i}>
                    <td
                      className="align-middle"
                      role="button"
                      onClick={() => copyToClipboard(i)}
                    >
                      <div className="text-center">{text}</div>
                      <div className="text-end text-muted">
                        &nbsp;{copiedScramble === text ? "Copied" : ""}
                      </div>
                    </td>
                    <td className="text-start">
                      <scramble-display
                        event="333"
                        scramble={scramble}
                        visualization={image3d ? "3D" : "2D"}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ScrambleImagesTable;
