import {useRef, useEffect} from 'react';
import {setIntervalAsync} from 'set-interval-async/dynamic';
import {clearIntervalAsync} from 'set-interval-async';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setIntervalAsync(tick, delay);
      return () => clearIntervalAsync(id);
    }
  }, [delay]);
}

export default useInterval;
