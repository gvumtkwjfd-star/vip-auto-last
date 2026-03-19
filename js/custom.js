document.addEventListener('DOMContentLoaded', function () {
    // Функция проверки обязательных полей
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('input[aria-required="true"], select[aria-required="true"], textarea[aria-required="true"]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                alert('Пожалуйста, заполните все обязательные поля.');
                field.focus();
                return false;
            }
        }
        return true;
    }

    // Квиз-форма
    const steps = document.querySelectorAll('.fieldset-cf7mls');
    let currentStep = 0;

    // Показать первый шаг
    steps[currentStep].classList.add('cf7mls_current_fs');

    // Функция для проверки текущего шага
    function validateStep(step) {
        const requiredFields = step.querySelectorAll('input[aria-required="true"], select[aria-required="true"], textarea[aria-required="true"]');
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                alert('Пожалуйста, заполните все обязательные поля.');
                field.focus();
                return false;
            }
        }
        return true;
    }

    // Функция для обновления прогресс-бара и текста
    function updateProgressBar() {
        const totalSteps = steps.length; // Общее количество шагов (6)
        const questionSteps = totalSteps - 1; // Количество вопросов (5, так как последний шаг — это "Готово")
        const currentQuestion = Math.min(currentStep + 1, questionSteps); // Текущий вопрос (не больше 5)
        const progressPercent = ((currentStep + 1) / totalSteps) * 100; // Процент заполнения

        // Обновляем текст "Вопрос X из 5"
        const stepTextElement = document.querySelector('.cf7mls_step_current');
        if (currentStep < questionSteps) {
            stepTextElement.textContent = `Вопрос ${currentQuestion} из ${questionSteps}`;
        } else {
            stepTextElement.textContent = 'Готово';
        }

        // Обновляем текст "X/6"
        const numberTextElement = document.querySelector('.cf7mls_number');
        numberTextElement.textContent = `${currentStep + 1}/${totalSteps}`;

        // Обновляем ширину прогресс-бара
        const progressBarInner = document.querySelector('.cf7mls_progress_barinner');
        progressBarInner.style.width = `${progressPercent}%`;
    }

    // Вызываем при загрузке страницы
    updateProgressBar();

    // Обработка кнопок "Далее" в квиз-форме
    document.querySelectorAll('.cf7mls_next').forEach(button => {
        button.addEventListener('click', function () {
            if (validateStep(steps[currentStep]) && currentStep < steps.length - 1) {
                steps[currentStep].classList.remove('cf7mls_current_fs');
                currentStep++;
                steps[currentStep].classList.add('cf7mls_current_fs');
                updateProgressBar();
            }
        });
    });

    // Обработка кнопок "Назад" в квиз-форме
    document.querySelectorAll('.cf7mls_back').forEach(button => {
        button.addEventListener('click', function () {
            if (currentStep > 0) {
                steps[currentStep].classList.remove('cf7mls_current_fs');
                currentStep--;
                steps[currentStep].classList.add('cf7mls_current_fs');
                updateProgressBar();
            }
        });
    });

    // Обработка отправки всех форм
    document.querySelectorAll('.wpcf7-form').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Проверка обязательных полей
            if (!validateForm(form)) {
                return;
            }

            // Собираем данные формы
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Отправляем данные в PHP через fetch
            fetch('/send-to-telegram.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Показываем сообщение об успешной отправке
                    jQuery.fancybox.open('<div class="popap ok-send"><h3>Спасибо за обращение!</h3><p>Наш менеджер свяжется с вами в ближайшее время.</p></div>');
                    form.reset(); // Очищаем форму
                    setTimeout(() => {
                        window.location.href = result.redirect; // Редирект на страницу благодарности
                    }, 2000); // Задержка 2 секунды для показа сообщения
                } else {
                    console.error('Ошибка отправки:', result.error);
                    alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова.');
                }
            })
            .catch(error => {
                console.error('Ошибка отправки:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова.');
            });
        });
    });
});