export default {
  methods: {
    getKm(num: number) {
      const result: number = +(num / 1000).toFixed(1);
      if (result >= 0) {
        return result + "km";
      } else {
        return "-";
      }
    },
  },
};
