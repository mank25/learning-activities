import { useState, useEffect } from 'react';
import { activities as allActivities } from '../data/activities';

export const useActivities = () => {
  const [filtered, setFiltered] = useState(allActivities);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (filter === 'All') setFiltered(allActivities);
    else setFiltered(allActivities.filter((a) => a.type === filter));
  }, [filter]);

  return { activities: filtered, setFilter };
};
