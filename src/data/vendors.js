const vendors = [
  {
    id: 'aubasani-kitchen',
    name: 'Aubasani Bistro',
    location: 'Mahallah Ali, Level 1',
    openHours: '8:00 am - 10:00 pm',
    isopen: true,
    menu: [
      {
        id: 'aub-1',
        name: 'Chicken Shawarma Wrap',
        description: 'Spiced grilled chicken wrapped in pita with garlic sauce and pickles',
        price: 8.50,
        category: 'Wraps',
        available: true,
      },
      {
        id: 'aub-2',
        name: 'Mandi Rice with Lamb',
        description: 'Traditional slow-cooked fragrant rice served with tender lamb shank',
        price: 15.00,
        category: 'Rice',
        available: true,
      },
      {
        id: 'aub-3',
        name: 'Fresh Mango Lassi',
        description: 'Chilled yogurt drink blended with sweet ripe mangoes',
        price: 4.50,
        category: 'Drinks',
        available: false,
      },
    ],
  },
  {
    id: 'kafe-aminah',
    name: 'Kafe Mahallah Aminah',
    location: 'Mahallah Aminah, Ground Floor',
    openHours: '8:00 am - 9:00 pm',
    isopen: true,
    menu: [
      {
        id: 'ami-1',
        name: 'Nasi Ayam Penyet',
        description: 'Smashed fried chicken with sambal and rice',
        price: 9.00,
        category: 'Rice',
        available: true,
      },
      {
        id: 'ami-2',
        name: 'Air Bandung',
        description: 'Rose syrup with milk',
        price: 3.00,
        category: 'Drinks',
        available: true,
      },
    ],
  },
]

export default vendors