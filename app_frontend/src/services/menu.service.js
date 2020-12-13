export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Users',
    },
    {
      title: 'User',
      key: 'apps',
      icon: 'fe fe-user',
      children: [
        {
          title: 'Profile',
          key: 'appsProfile',
          url: '/apps/profile',
        },
      ],
    },
    {
      category: true,
      title: 'Test Development',
    },
    {
      title: 'Developers',
      key: 'developers',
      icon: 'fe fe-target',
      // roles: ['admin'], // set user roles with access to this route
      count: 2,
      children: [
        {
          title: 'Projects',
          key: 'dashboard',
          url: '/dashboard/projects',
        },
      ],
    },
  ]
}
