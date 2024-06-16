// src/components/LocateControl.tsx

import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocateControlProps {
  onLocate: () => void;
  map: L.Map;
}

const LocateControl: React.FC<LocateControlProps> = ({ onLocate, map }) => {
  useEffect(() => {
    const customControl = L.Control.extend({
      options: {
        position: 'topright',
      },
      onAdd: function (map: L.Map) {
        const container = L.DomUtil.create(
          'button',
          'leaflet-bar leaflet-control leaflet-control-custom'
        );
        container.style.backgroundColor = 'white';
        container.style.width = '100px';
        container.style.height = '30px';
        container.innerText = 'Locate Me';
        container.onclick = onLocate;

        return container;
      },
    });

    const newControl = new customControl();
    newControl.addTo(map);

    return () => {
      newControl.remove();
    };
  }, [map, onLocate]);

  return null;
};

export default LocateControl;
