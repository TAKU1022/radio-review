export type Program = {
  $: {
    dur: string;
    ft: string;
    ftl: string;
    id: string;
    master_id: string;
    to: string;
    tol: string;
  };
  desc: string;
  failed_record: string;
  genre: {
    personality: { $: { id: string }; name: string };
    program: { $: { id: string }; name: string };
  };
  img: string;
  info: string;
  metas: {
    meta: { $: { name: string; value: string } };
  };
  pfm: string;
  tag?: {
    item: { name: string }[];
  };
  title: string;
  ts_in_ng: string;
  ts_out_ng: string;
  url: string;
  url_link: string;
};

export type Station = {
  $: { id: string };
  name: string;
  progs: {
    date: string;
    prog: Program[];
  }[];
};

export type RadikoWeekProgram = {
  radiko: {
    srvtime: string;
    stations: {
      station: Station;
    };
    ttl: string;
  };
};

export type Radio = {
  radioId: string;
  title: string;
  genre:
    | {
        personality?: { $: { id: string }; name: string };
        program?: { $: { id: string }; name: string };
      }
    | string;
  img: string;
  desc?: string;
  info: string;
  url: string;
  pfm: string;
  station: {
    id: string;
    name: string;
    logo: string;
  };
};
