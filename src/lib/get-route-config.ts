export interface RouteConfig {
  title: string;
  className: string;
}

async function getWordListById(id: string): Promise<{ title: string }> {
  const idTitleMap = new Map([
    ['0', 'Default'],
    ['1', 'Animals'],
  ]);
  return { title: idTitleMap.get(id) || 'Words List' };
}

export async function getRouteConfig(
  pathname: string,
): Promise<RouteConfig | null> {
  // Static routes
  const staticRoutes: Record<string, RouteConfig> = {
    '/quick-quiz': {
      title: 'Quick Quiz',
      className: 'bg-amber-300',
    },
    '/word-lists': {
      title: 'Word Lists',
      className: 'bg-green-300',
    },
  };

  if (staticRoutes[pathname]) {
    return staticRoutes[pathname];
  }

  // Dynamic routes with DB lookup
  const wordListMatch = pathname.match(/^\/word-lists\/([a-zA-Z0-9-]+)$/);
  if (wordListMatch) {
    const id = wordListMatch[1];
    try {
      const wordList = await getWordListById(id);
      return {
        title: wordList?.title || 'Word List',
        className: 'bg-blue-300',
      };
    } catch (error) {
      console.error('Failed to fetch word list:', error);
      return {
        title: 'Word List',
        className: 'bg-blue-300',
      };
    }
  }

  return null;
}
