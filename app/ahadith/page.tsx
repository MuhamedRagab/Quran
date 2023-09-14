import Container from "../components/Container";
import AhadithList from "./components/AhadithList";

export default function AhadithPage() {
  return (
    <Container
      className="prose flex flex-col justify-center items-center"
      isRtl={true}
    >
      <h1>أحاديث نبويه</h1>
      <AhadithList />
    </Container>
  );
}
