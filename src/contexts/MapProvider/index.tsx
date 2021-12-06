import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";

interface ContextValues {
  map: kakao.maps.Map | undefined;
  handleInitMap: (map: kakao.maps.Map) => void;
}

const initialValues = {
  map: undefined,
  handleInitMap: () => {},
};

const MapContext = createContext<ContextValues>(initialValues);

export const useMapContext = () => useContext(MapContext);

interface Props {
  children: ReactNode;
}

const MapProvider = ({ children }: Props) => {
  const [map, setMap] = useState<kakao.maps.Map>();

  const handleInitMap = useCallback((map: kakao.maps.Map) => {
    setMap(map);
  }, []);

  return (
    <MapContext.Provider value={{ map, handleInitMap }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
