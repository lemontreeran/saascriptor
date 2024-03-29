import { toast } from "react-toastify";
import { writeRecord } from "../utils/web5";
import { DingerProtocolDefinition } from "../config/web5-protocol";
import useSetupWeb5 from "./useSetupWeb5";

const useSubmitDing = () => {
  const { did: fromDid } = useSetupWeb5();
  const handleSubmit = async (toDid: string, note: string) => {
    console.log(toDid, note);

    try {
      toast.info("writing ding to local DWN...");
      const { record, status } = await writeRecord({
        data: {
          dinger: fromDid,
          note,
        },
        message: {
          protocol: DingerProtocolDefinition.protocol,
          protocolPath: "ding",
          schema: "ding",
          recipient: toDid,
        },
      });

      if (status.code !== 202) {
        toast.error(`${status.code} - ${status.detail}`);
        return;
      }

      const shortenedDid = toDid.substr(0, 22);
      toast.success(`Ding written locally! Dinging ${shortenedDid}...`);

      if (!record) return;

      const { status: sendStatus } = await record.send(toDid);
      if (sendStatus.code !== 202) {
        console.log("Unable to send to target did:" + sendStatus);
        toast.error(`${sendStatus.code} - ${sendStatus.detail}`);
        return;
      }
      console.log(await record.send(toDid));

      toast.success(`Dinged ${shortenedDid}!`);
    } catch (err: any) {
      toast.error(err.message);
      return;
    }
  };

  return { handleSubmit };
};

export default useSubmitDing;
