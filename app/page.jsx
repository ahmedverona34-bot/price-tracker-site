/* Server component.
 *
 * All it does is read the staged installer's metadata at build time and hand it
 * to <Site>. Keeping the filesystem read here — rather than in a client
 * component — is what lets the download button know its real filename and size
 * on the very first paint, instead of after a fetch that a click could race.
 */

import Site from "../components/Site";
import { info } from "../lib/info";

export default function Page() {
  return <Site info={info} />;
}
