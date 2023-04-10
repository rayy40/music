export const slideLeft = (carouselRef) => {
  if (carouselRef.current.scrollLeft !== 0) {
    carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
  }
};

export const slideRight = (carouselRef, setVisibility) => {
  setVisibility(true);
  carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
};

export const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const removeDupElements = (arr) => {
  return arr.reduce((acc, current) => {
    const x = acc.find((item) => item.release_date === current.release_date);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
};

export const changeDateToStringDate = (date) => {
  let dt = date.split("-");
  let today = new Date(date);
  return (
    today.toLocaleString("default", { month: "short" }) +
    " " +
    dt[2] +
    ", " +
    dt[0]
  );
};

export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export const charts = [
  {
    code: "WD",
    name: "Global",
    img: "https://charts-images.scdn.co/assets/locale_en/viral/daily/region_global_large.jpg",
    id: "37i9dQZEVXbLiRSasKsNU9",
  },
  {
    code: "GB",
    name: "United Kingdom",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_gb_large.jpg",
    id: "37i9dQZEVXbLnolsZ8PSNw",
  },
  {
    code: "US",
    name: "USA",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_us_large.jpg",
    id: "37i9dQZEVXbLRQDuF5jeBp",
  },
  {
    code: "CA",
    name: "Canada",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ca_large.jpg",
    id: "37i9dQZEVXbKj23U1GF4IR",
  },
  {
    code: "MX",
    name: "Mexico",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_mx_large.jpg",
    id: "37i9dQZEVXbO3qyFxbkOE1",
  },
  {
    code: "AU",
    name: "Australia",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_au_large.jpg",
    id: "37i9dQZEVXbJPcfkRz0wJ0",
  },
  {
    code: "JP",
    name: "Japan",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_jp_large.jpg",
    id: "37i9dQZEVXbKXQ4mDTEBXq",
  },
  {
    code: "ES",
    name: "Spain",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_es_large.jpg",
    id: "37i9dQZEVXbNFJfN1Vw8d9",
  },
  {
    code: "DE",
    name: "Germany",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_de_large.jpg",
    id: "37i9dQZEVXbJiZcmkrIHGU",
  },
  {
    code: "RU",
    name: "Russia",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ru_large.jpg",
    id: "37i9dQZEVXbL8l7ra5vVdB",
  },
  {
    code: "AR",
    name: "Argentina",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ar_large.jpg",
    id: "37i9dQZEVXbMMy2roB9myp",
  },
  {
    code: "AT",
    name: "Austria",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_at_large.jpg",
    id: "37i9dQZEVXbKNHh6NIXu36",
  },
  {
    code: "BE",
    name: "Belgium",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_be_large.jpg",
    id: "37i9dQZEVXbJNSeeHswcKB",
  },
  {
    code: "BR",
    name: "Brasil",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_br_large.jpg",
    id: "37i9dQZEVXbMXbN3EUUhlg",
  },
  {
    code: "CL",
    name: "Chile",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_cl_large.jpg",
    id: "37i9dQZEVXbL0GavIqMTeb",
  },
  {
    code: "CO",
    name: "Colombia",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_co_large.jpg",
    id: "37i9dQZEVXbOa2lmxNORXQ",
  },
  {
    code: "CZ",
    name: "Czech Republic",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_cz_large.jpg",
    id: "37i9dQZEVXbIP3c3fqVrJY",
  },
  {
    code: "DK",
    name: "Denmark",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_dk_large.jpg",
    id: "37i9dQZEVXbL3J0k32lWnN",
  },
  {
    code: "DO",
    name: "Dominican Republic",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_do_large.jpg",
    id: "37i9dQZEVXbKAbrMR8uuf7",
  },
  {
    code: "EC",
    name: "Ecuador",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ec_large.jpg",
    id: "37i9dQZEVXbJlM6nvL1nD1",
  },
  {
    code: "FI",
    name: "Finland",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_fi_large.jpg",
    id: "37i9dQZEVXbMxcczTSoGwZ",
  },
  {
    code: "GT",
    name: "Guatemala",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_gt_large.jpg",
    id: "37i9dQZEVXbLy5tBFyQvd4",
  },
  {
    code: "HK",
    name: "Hong Kong",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_hk_large.jpg",
    id: "37i9dQZEVXbLwpL8TjsxOG",
  },
  {
    code: "HU",
    name: "Hungary",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_hu_large.jpg",
    id: "37i9dQZEVXbNHwMxAkvmF8",
  },
  {
    code: "IN",
    name: "India",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_in_large.jpg",
    id: "37i9dQZEVXbLZ52XmnySJg",
  },
  {
    code: "ID",
    name: "Indonesia",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_id_large.jpg",
    id: "37i9dQZEVXbObFQZ3JLcXt",
  },
  {
    code: "IE",
    name: "Ireland",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ie_large.jpg",
    id: "37i9dQZEVXbKM896FDX8L1",
  },
  {
    code: "IL",
    name: "Israel",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_il_large.jpg",
    id: "37i9dQZEVXbJ6IpvItkve3",
  },
  {
    code: "IT",
    name: "Italy",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_it_large.jpg",
    id: "37i9dQZEVXbIQnj7RRhdSX",
  },
  {
    code: "MY",
    name: "Malaysia",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_my_large.jpg",
    id: "37i9dQZEVXbJlfUljuZExa",
  },
  {
    code: "NL",
    name: "Netherlands",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_nl_large.jpg",
    id: "37i9dQZEVXbKCF6dqVpDkS",
  },
  {
    code: "NZ",
    name: "New Zealand",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_nz_large.jpg",
    id: "37i9dQZEVXbM8SIrkERIYl",
  },
  {
    code: "NO",
    name: "Norway",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_no_large.jpg",
    id: "37i9dQZEVXbJvfa0Yxg7E7",
  },
  {
    code: "PA",
    name: "Panama",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_pa_large.jpg",
    id: "37i9dQZEVXbKypXHVwk1f0",
  },
  {
    code: "PE",
    name: "Peru",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_pe_large.jpg",
    id: "37i9dQZEVXbJfdy5b0KP7W",
  },
  {
    code: "PH",
    name: "Philippines",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ph_large.jpg",
    id: "37i9dQZEVXbNBz9cRCSFkY",
  },
  {
    code: "PL",
    name: "Poland",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_pl_large.jpg",
    id: "37i9dQZEVXbN6itCcaL3Tt",
  },
  {
    code: "RO",
    name: "Romania",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ro_large.jpg",
    id: "37i9dQZEVXbNZbJ6TZelCq",
  },
  {
    code: "SG",
    name: "Singapore",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_sg_large.jpg",
    id: "37i9dQZEVXbK4gjvS1FjPY",
  },
  {
    code: "SK",
    name: "Slovakia",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_sk_large.jpg",
    id: "37i9dQZEVXbKIVTPX9a2Sb",
  },
  {
    code: "ZA",
    name: "South Africa",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_za_large.jpg",
    id: "37i9dQZEVXbMH2jvi6jvjk",
  },
  {
    code: "SE",
    name: "Sweden",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_se_large.jpg",
    id: "37i9dQZEVXbLoATJ81JYXz",
  },
  {
    code: "CH",
    name: "Switzerland",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ch_large.jpg",
    id: "37i9dQZEVXbJiyhoAPEfMK",
  },
  {
    code: "TW",
    name: "Taiwan",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_tw_large.jpg",
    id: "37i9dQZEVXbMnZEatlMSiu",
  },
  {
    code: "TH",
    name: "Thailand",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_th_large.jpg",
    id: "37i9dQZEVXbMnz8KIWsvf9",
  },
  {
    code: "TR",
    name: "Turkey",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_tr_large.jpg",
    id: "37i9dQZEVXbIVYVBNw9D5K",
  },
  {
    code: "UA",
    name: "Ukraine",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_ua_large.jpg",
    id: "37i9dQZEVXbKkidEfWYRuD",
  },
  {
    code: "VN",
    name: "Vietnam",
    img: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_vn_large.jpg",
    id: "37i9dQZEVXbLdGSmz6xilI",
  },
];
