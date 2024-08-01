import prompts from 'prompts';

(async () => {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message: 'How old are you?',
    validate: value => value < 18 ? `Driving is 18+ only` : true
  });

  console.log(response.value); // => { value: 24 }
})();