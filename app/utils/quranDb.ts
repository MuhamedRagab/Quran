export const getSurah = async (surahId: number) => {
  try {
    const surah = await (
      await fetch(`${process.env.NEXT_PUBLIC_QURAN_API}/surah/${surahId}`)
    ).json();

    return surah.data;
  } catch (error) {
    throw new Error(error.toString());
  }
};
