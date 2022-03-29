module.exports = {
  content: ['./pages/**/*.{html,js,jsx}','./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      keyframes: {
        'save-alert': {
          '0%, 100%': { transform: 'translate(0, 150px)', opacity: 0 },
          '20%, 80%': { transform: 'translate(0, 0)', opacity: 1 },
        }
      },
      animation: {
        'save-alert': 'save-alert 3s ease-in-out'
      }
    }
  },
  plugins: []
}