import { useState, useEffect } from "react";
import { dpto, prov, dist } from "@/ubigeo/ubigeo-peru";

export const useUbigeo = () => {
    const [dptoSel, setDptoSel] = useState([]);
    const [provList, setProvList] = useState([]);
    const [provSel, setProvSel] = useState([]);
    const [distList, setDistList] = useState([]);
    const [ , setDistSel] = useState([]);

    useEffect(() => {
        setProvList(prov.filter((prov) => prov.dpto_id && prov.dpto_id === dptoSel[0]?.id));
        setProvSel([])
    }, [dptoSel]);

    useEffect(() => {
        setDistList(dist.filter((dist) => dist.prov_id && dist.prov_id === provSel[0]?.id));
        setDistSel([])
    }, [dptoSel, provSel]);

    return {
        ubigeoSelect : {
            dpto,
            provList,
            distList,
        },
        setDptoSel,
        setProvSel,
        setDistSel,
    };
}