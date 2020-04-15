const Ticket = require('../models/ticketModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { hasFields } = require('../utils/object');

exports.removeTicket = catchAsync(async (req, res, next) => {
  hasFields(req.body, 'voting', 'user');
  const { user, voting } = req.params;

  const result = await Ticket.findOneAndDelete({ user, voting });
  if (!result) return next(new AppError('Такого документа не знайдено', 404));

  res.status(200).json({
    status: 'success',
    message: 'Тікет видалено',
  });
});

exports.removeTicketsBy = (field) =>
  catchAsync(async (req, res, next) => {
    await Ticket.deleteMany({ [field]: req.params.id });

    res.status(204).json({
      status: 'success',
      message: 'Успішно видалено',
    });
  });
