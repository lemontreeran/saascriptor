import { useEffect, useState } from "react";
import { queryRecords, userDid } from "../utils/web5";
import { DingerProtocolDefinition } from "../config/web5-protocol";

export const useReceiveDing = () => {
  const [dinged, setDinged] = useState<string[]>([]);
  const [dingedBy, setDingedBy] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDings();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const fetchDings = async () => {
    const { records, status } = await queryRecords({
      from: userDid,
      message: {
        filter: {
          protocol: DingerProtocolDefinition.protocol,
        },
        dateSort: "createdDescending",
      },
    });

    if (status.code !== 200 || !records) {
      console.error("Failed to query dings", status);
      return;
    }

    const newDinged: string[] = [];
    const newDingedBy: string[] = [];

    for (let record of records) {
      const { dinger, note } = await record.data.json();
      const ding = {
        id: record.id,
        did: dinger === userDid ? record.recipient : dinger,
        note: note,
        timestamp: new Date(record.dateCreated).toLocaleString(),
      };
      if (dinger === userDid) {
        newDinged.push(ding.note);
      } else {
        newDingedBy.push(ding.note);
      }
      //   console.log(await record.data.json());
      //   console.log(records.dinger);
    }
    console.log(newDinged);
    console.log(newDingedBy);

    setDinged(newDinged);
    setDingedBy(newDingedBy);
  };

  return { dinged, dingedBy };
};
